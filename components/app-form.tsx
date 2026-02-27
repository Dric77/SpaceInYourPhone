import { Formik, FormikConfig, FormikValues, useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import { Vibration } from "react-native";

interface AppFormProps<
  Values extends FormikValues,
> extends FormikConfig<Values> {
  children: React.ReactNode | ((props: any) => React.ReactNode);
  vibrateOnFailure?: boolean;
}

const VibrationHandler = ({
  vibrateOnFailure,
}: {
  vibrateOnFailure: boolean;
}) => {
  const { submitCount, errors, isValidating } = useFormikContext();
  const prevSubmitCount = useRef(submitCount);

  useEffect(() => {
    // Only trigger if a submission attempt completed AND validation is ready
    if (
      vibrateOnFailure &&
      submitCount > prevSubmitCount.current &&
      !isValidating
    ) {
      if (Object.keys(errors).length > 0) {
        Vibration.vibrate(400);
      }
      prevSubmitCount.current = submitCount;
    }
  }, [submitCount, isValidating, errors, vibrateOnFailure]);

  return null;
};

export function AppForm<Values extends FormikValues = FormikValues>({
  children,
  vibrateOnFailure = false,
  ...props
}: AppFormProps<Values>) {
  return (
    <Formik {...props}>
      {(formikProps) => (
        <>
          <VibrationHandler vibrateOnFailure={vibrateOnFailure} />
          {typeof children === "function" ? children(formikProps) : children}
        </>
      )}
    </Formik>
  );
}
