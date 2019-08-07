/**
 * @hidden
 */
export default class DateUtils {
    public static convertToDate(date: string): Date {
        if (date === null) return null;

        return new Date(date);
    }
}
