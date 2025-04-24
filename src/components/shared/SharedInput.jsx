import SharedTextBox from "./SharedTextBox";

const SharedInput = {
  Text: ({ data = {}, children }) => (
    <SharedTextBox {...data}>{children && children}</SharedTextBox>
  ),
  Advanced: ({ title }) => <p>Ini advanced {title}</p>,
};

export default SharedInput;
