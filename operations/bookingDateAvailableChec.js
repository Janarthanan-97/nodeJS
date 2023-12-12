
let isDateAvailable = (array, object) => {

    let toBeBookStartDate = new Date(object.startDate);
    let toBeBookendDate = new Date(object.endDate);
    let count = 0;

    if(toBeBookStartDate <= toBeBookendDate){
        for (let index = 0; index < array.length; index++) {
            let startDate = new Date(array[index].startDate);
            let endDate = new Date(array[index].endDate);
    
            console.log(startDate, endDate, toBeBookStartDate, toBeBookendDate)
    
            if (toBeBookStartDate >= startDate && toBeBookStartDate <= endDate) {
                return false;
            }
            else {
                if (toBeBookendDate >= startDate && toBeBookendDate <= endDate) {
                    return false;
                }
                else {
                    if(toBeBookStartDate < startDate){
                        if(toBeBookendDate <startDate){
                            count++;
                        }
                        else{return false;}
                    }
                    else{
                        count++;
                    }
                }
            }
        }
            return true;
    }
    else{
        return false;
    }
}

    module.exports = isDateAvailable;