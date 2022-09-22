// import Picker from 'emoji-picker-react';
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Emoji = (props) => {
  const onEmojiClick = (event, emojiObject) => {
    props.onAddEmoji(emojiObject);
  };

  return (
    <div className="emoji" hidden={props.hidden}>
      <Picker
        pickerStyle={{
          position: "absolute",
          left: "48px",
          top: "125px",
        }}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default Emoji;
