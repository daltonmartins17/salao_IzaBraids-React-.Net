import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt", pt);

export default function Calendario({ selected, onChange, ...props }) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      locale="pt"
      dateFormat="dd/MM/yyyy"
      className="w-full border rounded p-2"
      {...props}
    />
  );
}
