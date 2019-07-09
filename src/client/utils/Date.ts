export default class DateUtils {
    public static convertToDate(date: string) {
        if (date === null) return null;

        return new Date(date);
    }
}
