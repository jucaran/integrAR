import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation UploadCsv($file: Upload!) {
    uploadCsv(file: $file) {
      status
    }
  }
`;
