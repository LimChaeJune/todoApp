import { FieldErrors } from 'react-hook-form'

interface FormErrorsProps {
  errors: FieldErrors
}

const FormErrors = ({ errors }: FormErrorsProps) => {
  if (Object.keys(errors).length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-1 text-red-500 text-sm">
      {Object.entries(errors).map(
        ([field, error]) =>
          error?.message && <p key={field}>{String(error.message)}</p>
      )}
    </div>
  )
}

export default FormErrors
