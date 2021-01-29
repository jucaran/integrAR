import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation UploadCsv($file: Upload!) {
    uploadCsv(file: $file) {
      status
    }
  }
`;

export const UPLOAD_CLASS_FILE = gql`
  mutation UploadClassFile($file: Upload!, $classId: ID!) {
    uploadClassFile(file: $file, classId: $classId) {
      status
    }
  }
`;
