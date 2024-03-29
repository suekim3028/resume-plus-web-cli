import { Font, Layout as L } from "@design-system";
import { useState } from "react";

const SelectChips = <T,>({
  options,
  onSelect,
  disabled,
}: SelectChipsProps<T>) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <L.FlexCol pv={5}>
      <L.FlexRow>
        {options.map((option, idx) => {
          const selected = selectedIdx === idx;
          return (
            <L.FlexRow
              pv={8}
              ph={30}
              key={option.text}
              ml={idx === 0 ? 0 : 10}
              rounded={10}
              bgColor={selected ? "PRIMARY_300" : "BASIC_WHITE"}
              hoverBgColor={selected || disabled ? undefined : "PRIMARY_100"}
              outline={"GRAY_400"}
              onClick={() => {
                if (disabled) return;
                let isNull = false;
                setSelectedIdx((p) => {
                  if (p === idx) {
                    isNull = true;
                    return null;
                  }

                  return idx;
                });
                onSelect(isNull ? null : option.value);
              }}
            >
              <Font.Body
                type={"16_medium_single"}
                color={selected ? "BASIC_WHITE" : "GRAY_800"}
              >
                {option.text}
              </Font.Body>
            </L.FlexRow>
          );
        })}
      </L.FlexRow>
    </L.FlexCol>
  );
};

type SelectChipsProps<T> = {
  options: { value: T; text: string }[];
  onSelect: (option: T | null) => void;
  disabled?: boolean;
};

export default SelectChips;
