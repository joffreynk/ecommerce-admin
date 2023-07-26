interface headingProps {
    title:string,
    description:string
}

const Heading = ({title, description}: headingProps) => {
  return (
    <div>
    <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading