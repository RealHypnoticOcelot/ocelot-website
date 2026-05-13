export const getFileName = (filePath: string): string => {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
  return fileName;
}