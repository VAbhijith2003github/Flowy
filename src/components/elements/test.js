const getDaysDifference = (date1, date2) => {
    const startOfDay1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const startOfDay2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
    const timeDifference = Math.abs(startOfDay2.getTime() - startOfDay1.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
    return daysDifference;
  };

const nextDate = new Date("2022-04-1")
const today = new Date("2022-03-26");
console.log(getDaysDifference(today, nextDate));