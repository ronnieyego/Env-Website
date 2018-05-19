export const roundData = graphData => {
    return graphData.map(row => {
        const rowKeys = Object.keys(row);
        rowKeys.forEach(key => {
            const value = row[key];
            if(typeof value === 'number') {
                if(value < 10) {
                    row[key] = Math.round(value * 100)/100;
                } else {
                    row[key] = Math.round(value);
                }
            }
        });
        return row;
    })
};
