export const findFile = (fileName, filesArray) => {
    return filesArray.find(file => file.name === fileName);
}
