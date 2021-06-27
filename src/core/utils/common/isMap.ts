export const isMap = (val: string | undefined, data: string | Array<string> | undefined) => {
    if (data === undefined || val === undefined) {
        return false;
    }

    console.log(val)

    if (Array.isArray(data)) {
        for (const value of data) {
            if (val.includes(value)) {
                return true;
            }
        }

        return false;
    }

    return val.includes(data);
};