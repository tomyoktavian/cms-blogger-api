type Props = {
  date: string,
  className?: string
}

const PostDate = ({ date, className }: Props) => {
  const thisdate = new Date(date);
  const dateString = thisdate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return <time
    className={className}
    dateTime={date}>
    {dateString}
  </time>;
};

export default PostDate;