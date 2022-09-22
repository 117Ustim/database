import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import styles from "../styles/ContactList.module.scss";

function ContactItem(props) {
  return (
    <div className={styles.contact}>
      <ul className={styles.form}>
        {props.contacts.map((contact) => (
          <li className={styles.li} key={contact.id}>
            <div className={styles.contactEmoji}>
              <span className="contact-emoji">{contact.emoji?.emoji}</span>
            </div>

            <Tooltip title={contact.surname} placement="top" arrow>
              <div className={styles.contactfield} type="text">
                {contact.surname}
              </div>
            </Tooltip>

            <Tooltip title={contact.name} placement="top" arrow>
              <div className={styles.contactfieldName} type="text">
                <Link href={`/users/${contact.id}`}>{contact.name}</Link>
              </div>
            </Tooltip>

            <div className={styles.contactfield} type="text">
              {contact.phone}
            </div>

            <div className={styles.buttons}>
              <Button
                variant="contained"
                className={styles.button}
                type="button"
                onClick={(e) => props.onDeleteContact(contact.id)}
              >
                Delete Contact
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactItem;
