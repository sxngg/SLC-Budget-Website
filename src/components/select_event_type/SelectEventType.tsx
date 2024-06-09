import { MenuItem, TextField } from "@mui/material";
import { useStyles } from './SelectEventTypeStyles';

interface EventSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEnableEditForm: boolean;
}
export const SelectEventType: React.FC<EventSelectProps> = ({ value, onChange, isEnableEditForm }) => {
  const eventTypes = ["VIAJE", "HOGAR", "PAREJA", "COMIDA", "OTRO"];

  return (
    <TextField
      select
      value={value}
      onChange={onChange}
      sx={{
        ...useStyles.textField,
        "& .MuiInputBase-input": { paddingLeft: "10px" },
      }}
      required
      fullWidth
      variant="standard"
      id="event-name"
      label=""
      disabled={!isEnableEditForm}
    >
      {eventTypes.map((eventType) => (
        <MenuItem key={eventType} value={eventType}>
          {eventType}
        </MenuItem>
      ))}
    </TextField>
  );
};