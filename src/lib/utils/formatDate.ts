export type DateFormat = {
  date: Date;
  YMD: string;
  HM: string;
  dateString: string;
};

export const formatDate = (dateInput: string | number, local: boolean = false): DateFormat => {
  try {
    const dateObject = new Date(dateInput);
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: local ? undefined : "UTC",
      timeZoneName: "short",
    };
    const partsObject = new Intl.DateTimeFormat("en-US", dateOptions).formatToParts(dateObject);
    const parts = Object.fromEntries(
      partsObject.map(
        (part) => [part.type, part.value]
      )
    );
    const YMD = `${parts.year}/${parts.month}/${parts.day}`;
    const HM = !(parts.hour == "12" && parts.minute == "00") ? `${parts.hour}:${parts.minute} ${parts.dayPeriod} ${parts.timeZoneName}` : "";
    return {
      date: dateObject,
      YMD: YMD,
      HM: HM,
      dateString: YMD + (HM ? " at " + HM : "")
    }
  } catch {
    return {
      date: new Date(0),
      YMD: "",
      HM: "",
      dateString: ""
    };
  }
}