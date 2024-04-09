import { formRef, storage } from "@/utils/firebase";
import { addDoc, updateDoc } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

const tableName = "Forms";

interface FormData {
  userId?: string;
  scientificName: string;
  name: string;
  characteristic: string;
  behavior: string;
  habitat: string;
  imageUrl: string;
  type: string;
  submissionDate: string;
  status: string;
}

export const addFormData = async (data: FormData) => {
  try {
    const [uploadPromise, addDocPromise] = await Promise.all([
      uploadImageToFirebase(data.imageUrl),
      addDoc(formRef, { ...data, imageUrl: "" }),
    ]);

    const { downloadUrl } = uploadPromise;
    await updateDoc(addDocPromise, { imageUrl: downloadUrl });
    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

const uploadImageToFirebase = async (
  imageUrl: string
): Promise<{ downloadUrl: string }> => {
  const imageRef = ref(storage, `form/${imageUrl.split("/").pop()}`);

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress updates if needed
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadUrl });
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
