export interface IElectronAPI {
  sendFrequency: (value: number) => Promise<string>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
