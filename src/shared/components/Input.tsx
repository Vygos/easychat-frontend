import { TextField } from "@material-ui/core";

const Input = ({formik, ...props }: any) => {


  const handleTouched = () => {
    if (props.onBlur) {
      props.onBlur();
    }
    formik.validateField(props.id)
    formik.setFieldTouched(props.id);
  };

  return (
    <TextField
      {...props}
      onBlur={handleTouched}
    />
  );
};

export default Input;