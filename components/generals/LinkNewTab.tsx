interface Props {
  children: any
  href: string
}

export default function LinkNewTab({ children, href }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}
