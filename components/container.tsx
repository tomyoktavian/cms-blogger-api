import { cx } from "@utils/classnames";

export default function Container(props: any) {
  return (
    <div
      className= {
        cx(
          "container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg",
          props.className
        )
      }>
      { props.children }
    </div>
  );
}
