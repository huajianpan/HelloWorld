import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import viteMock from "./src/mock/vite-mock";

export const mockModules = [...viteMock];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}