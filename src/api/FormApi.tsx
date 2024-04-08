import { formRef, storage } from "@/utils/firebase";
import { addDoc } from "@firebase/firestore";
import { ref, uploadBytesResumable } from "@firebase/storage";

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
    await uploadImageToFirebase(data.imageUrl, (v) => console.log(v));

    data.imageUrl = `form/${data.imageUrl.split("/").pop()}`;
    await addDoc(formRef, data);
    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

const uploadImageToFirebase = async (
  imageUrl: string,
  onProgress: (v: any) => void
) => {
  const imageRef = ref(storage, `form/${imageUrl.split("/").pop()}`);

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise(() => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          throw error;
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
