export type DateFormat = {
  date: Date;
  YMD: string;
  HM: string;
  dateString: string;
};

export const formatDate = (dateInput: string | number | undefined, timeZone: string | null = "UTC"): DateFormat => {
  try {
    const dateObject = new Date(dateInput ?? ''); // If you plan on passing Unix timestamps, make sure to use milliseconds and not seconds.
    // You can convert from seconds to milliseconds by multiplying by 1000 (or just adding three zeroes at the end)
    // Usually, though, just pass "new Date().toISOString()", or an ISO 8601-compatible string
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timeZone ?? undefined,
      // If you pass nothing for timeZone, it'll be UTC; if you pass null, it'll be undefined.
      // timeZone being undefined means it'll use the timezone of the device where the code is run.
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