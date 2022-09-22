import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Emoji from "./Emoji";
import styles from "../styles/AddContact.module.scss";


export default function AddContact(props) {
  const emptyContact = {
    id: null,
    emoji: { emoji: "" },
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    hobbies: "",
  };

  const [contact, setContact] = useState(emptyContact);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setContact(props.contact || emptyContact);
  }, [props.contact]);

  return (
    <div>
      <Emoji
        hidden={hidden}
        onAddEmoji={(emojiObj) => {
          setContact({ ...contact, emoji: emojiObj });
          setHidden(true);
        }}
      />

      <form className={styles.form}>
        <label>
          <button
            className={styles.button}
            id="emoji"
            name="emoji"
            onClick={(e) => {
              e.preventDefault();
              setHidden(!hidden);
            }}
          >
            Select emoji
          </button>
        </label>
        <span className="contact-emoji">{contact?.emoji.emoji}</span>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            helperText="Please enter your Surname"
            size="small"
            label="Surname"
            id="surname"
            type="text"
            name="surname"
            value={contact?.surname}
            onChange={(e) =>
              setContact({ ...contact, surname: e.target.value })
            }
          />

          <TextField
            helperText="Please enter your name"
            size="small"
            label="Name"
            id="name"
            type="text"
            name="name"
            value={contact?.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />

          <TextField
            sx={{
              "& .MuiOutlinedInput-input": {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                },
              },
            }}
            helperText="Please enter your phone"
            size="small"
            label="Phone"
            id="phone"
            type="number"
            name="phone"
            value={contact?.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </Box>

        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          value="Save Contact"
          onClick={(e) => {
            e.preventDefault();
            props.onAddContact(contact);
            setContact(emptyContact);
          }}
        >
          Save Contact
        </Button>
      </form>
    </div>
  );
}
