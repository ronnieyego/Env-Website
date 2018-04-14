const vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];

export const resolveArticle = (text, article = 'a') => {
    const firstLetter = text[0];
    const capitalize = vowels.indexOf(firstLetter) !== -1 ? true : false;
    if(capitalize && article === 'a') {
        return `an ${text}`;
    } else if(capitalize && article === 'A') {
        return `An ${text}`;
    } else if(article === 'A') {
        return `A ${text}`
    }
    return `a ${text}`
}