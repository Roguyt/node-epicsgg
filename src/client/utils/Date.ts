/**
 * @hidden
 */
export default class DateUtils {
    public static convertToDate(date: string | null): Date | null {
        if (date === null) return null;

        return new Date(date);
    }
}
