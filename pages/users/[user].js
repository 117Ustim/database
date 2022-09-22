import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../../styles/user.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
export default function User() {
  const router = useRouter();

  const [contactUser, setContactUser] = useState({
    id: null,
    emoji: { emoji: "" },
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    hobbies: "",
  });

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));

    if (router.query.user) {
      setContactUser(
        localContacts.find((e) => {
          return e.id == router.query.user;
        })
      );
    }
  }, [router.query.user]);

  const upContacts = (updatedContacts) => {
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const userEditContact = (contact) => {
    const localContacts = JSON.parse(localStorage.getItem("contacts"));
    const contactIndex = localContacts.findIndex((c) => c.id === contact.id);

    const updatedContacts = [...localContacts];
    updatedContacts.splice(contactIndex, 1, contact);
    upContacts(updatedContacts);
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{`Contact Details [${contactUser.name}]`}</Typography>
      </Breadcrumbs>

      <form className={styles.form}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <span className="contact-emoji">{contactUser.emoji?.emoji}</span>
          </div>
          <TextField
            helperText="Please enter your Surname"
            size="small"
            label="Surname"
            id="surname"
            type="text"
            name="surname"
            value={contactUser?.surname}
            onChange={(e) =>
              setContactUser({ ...contactUser, surname: e.target.value })
            }
          />

          <TextField
            helperText="Please enter your Name"
            size="small"
            label="Name"
            id="name"
            type="text"
            name="name"
            value={contactUser?.name}
            onChange={(e) =>
              setContactUser({ ...contactUser, name: e.target.value })
            }
          />

          <TextField
            sx={{
              "& .MuiOutlinedInput-input": {
                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                },
              },
            }}
            helperText="Please enter your Phone"
            size="small"
            label="Phone"
            id="phone"
            type="number"
            name="phone"
            value={contactUser?.phone}
            onChange={(e) =>
              setContactUser({ ...contactUser, phone: e.target.value })
            }
          />

          <TextField
            helperText="Please enter your Email"
            size="small"
            label="Email"
            id="email"
            type="text"
            name="email"
            value={contactUser?.email}
            onChange={(e) =>
              setContactUser({ ...contactUser, email: e.target.value })
            }
          />
          <TextField
            helperText="Please enter your Address"
            size="small"
            label="Address"
            id="Address"
            type="text"
            name="address"
            value={contactUser?.address}
            onChange={(e) =>
              setContactUser({ ...contactUser, address: e.target.value })
            }
          />

          <TextField
            rows={4}
            sx={{
              "& .MuiInputBase-root": { width: "700px" },
            }}
            helperText="Please enter your hobbies"
            id="outlined-textarea"
            label="Hobbies"
            placeholder=""
            multiline
            value={contactUser?.hobbies}
            onChange={(e) =>
              setContactUser({ ...contactUser, hobbies: e.target.value })
            }
          />
        </Box>

        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          value="Save Contact"
          onClick={(e) => {
            e.preventDefault();
            userEditContact(contactUser);
          }}
        >
          Save Contact
        </Button>
      </form>
    </div>
  );
}
