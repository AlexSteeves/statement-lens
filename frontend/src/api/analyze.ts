import { type AnalysisResult } from "../types/index.ts";
import axios from "axios";

export const analyze = async (file: File): Promise<AnalysisResult> => {
  let formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<AnalysisResult>(
    "http://localhost:8080/api/analyze",
    formData,
  );

  return response.data;
};
