import { useEffect, useState } from "react"

export default function useForm({type, initialValues, onSubmit }) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        setSubmitting(true)
        e.preventDefault()
        // setErrors(validate(values))
    }

    useEffect(() => {
        if (submitting) {
            if (Object.keys(errors).length === 0) {
                onSubmit(values)
            }
            setSubmitting(false)
        }
    }, [errors])

    return [
        values,
        errors,
        submitting,
        handleChange,
        handleSubmit,
    ]
}