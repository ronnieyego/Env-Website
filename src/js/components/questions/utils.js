export const formatName = (name, formType) => {
    if(formType !== 'costs') {
        name = name.replace(/-/g,' ');
    }
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}