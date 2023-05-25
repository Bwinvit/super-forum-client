import { format, differenceInMinutes } from "date-fns";

const StandardDateTimeFormat = "M/dd/yyy"

const getTimePassIfLessThanDay = ( compTime: Date | null ): string => {
    if (!compTime) return ""

    const now = new Date()
    const diffInMinute = differenceInMinutes(now, compTime)

    console.log("diff:", diffInMinute);
    
    if (diffInMinute > 60) {
        if (diffInMinute > 24 * 60) {
            return format(compTime, StandardDateTimeFormat)
        }
        return Math.round(diffInMinute / 60) + "h ago"
    }
    return Math.round(diffInMinute) + "m ago"
}

export default getTimePassIfLessThanDay