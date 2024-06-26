import { formRef, storage } from "@/utils/firebase";
import { addDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
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

export const getNumberFormWithStatus = async (status?: string) => {
  try {
    const q = status
      ? query(formRef, where("status", "==", status))
      : query(formRef);
    const snapshot = await getDocs(q);

    const number = snapshot.docs.length;
    return number;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getFormsData = async (userId: string) => {
  try {
    const q = query(formRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const forms = snapshot.docs.map((doc) => doc.data());
    return forms;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};

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
