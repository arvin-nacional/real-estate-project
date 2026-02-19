'use client'

import React, { useCallback, useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { ContactSectionBlock as ContactSectionBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { fields } from '@/blocks/Form/fields'
import { getClientSideURL } from '@/utilities/getURL'

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

export const ContactSectionBlock: React.FC<ContactSectionBlockProps> = ({
  heading,
  contactItems,
  showWhyContactUs,
  whyContactUsHeading,
  whyContactUsItems,
  formHeading,
  formDescription,
  form: formFromProps,
  privacyText,
}) => {
  const form = formFromProps as FormType
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
    fields: formFields,
  } = form || {}

  const formMethods = useForm({
    defaultValues: formFields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-8">{heading}</h2>
            </div>

            <div className="space-y-6">
              {contactItems?.map(
                (
                  item: {
                    icon: string
                    iconColor: string
                    title: string
                    description: string
                    linkUrl?: string | null
                  },
                  index: number,
                ) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap]
                  const colorClass = item.iconColor === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                  const textColorClass =
                    item.iconColor === 'accent' ? 'text-accent' : 'text-primary'

                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        {Icon && <Icon className={`${textColorClass} h-6 w-6`} />}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {item.linkUrl ? (
                            <a href={item.linkUrl} className="hover:text-primary transition">
                              {item.description}
                            </a>
                          ) : (
                            item.description
                          )}
                        </p>
                      </div>
                    </div>
                  )
                },
              )}
            </div>

            {showWhyContactUs &&
              whyContactUsItems &&
              (whyContactUsItems as { color: string; text: string }[]).length > 0 && (
                <div className="bg-white border border-border rounded-xl p-6 space-y-4 mt-8">
                  <h3 className="font-semibold">{whyContactUsHeading}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {(whyContactUsItems as { color: string; text: string }[]).map(
                      (item: { color: string; text: string }, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span
                            className={`${item.color === 'accent' ? 'text-accent' : 'text-primary'} font-bold`}
                          >
                            •
                          </span>
                          <span>{item.text}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold">{formHeading}</h2>
              {formDescription && <p className="text-muted-foreground">{formDescription}</p>}

              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center space-y-2">
                    <RichText data={confirmationMessage} enableGutter={false} />
                  </div>
                )}
                {isLoading && !hasSubmitted && (
                  <p className="text-muted-foreground">Loading, please wait...</p>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {`${error.status || '500'}: ${error.message || ''}`}
                  </div>
                )}
                {!hasSubmitted && form && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {formFields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div key={index}>
                            <Field
                              form={form}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}

                    <Button
                      form={formID}
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      {submitButtonLabel || 'Send Message'}
                    </Button>

                    {privacyText && (
                      <p className="text-xs text-muted-foreground text-center">{privacyText}</p>
                    )}
                  </form>
                )}
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
