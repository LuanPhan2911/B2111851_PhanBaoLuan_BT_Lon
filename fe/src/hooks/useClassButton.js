import _ from "lodash";

export function useClassButton() {
  const btn = [
    "btn-primary",
    "btn-success",
    "btn-info",
    "btn-warning",
    "btn-secondary",
    "btn-light",
    "btn-danger",
  ];
  const getRandom = () => _.sample(btn);
  return { btn, getRandom };
}
