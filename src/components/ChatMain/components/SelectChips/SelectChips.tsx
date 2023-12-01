import { Font, Icons, Layout as L } from "@design-system";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "styled-components";

const SelectChips = <T,>({
  options,
  onSelect,
  selectable,
}: SelectChipsProps<T>) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <L.FlexCol w={"100%"} mb={30}>
      <L.FlexRow>
        {options.map((option, idx) => {
          const selected = selectedIdx === idx;
          return (
            <L.FlexRow
              pv={8}
              ph={12}
              key={option.text}
              ml={idx === 0 ? 0 : 10}
              rounded={20}
              bgColor={selected ? "inverseSurface" : "inverseOnSurface"}
              hoverBgColor={selected || !selectable ? undefined : "surfaceDim"}
              outline={"inverseSurface"}
              onClick={() => {
                if (!selectable) return;
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
                type={"14_medium_single"}
                color={selected ? "inverseOnSurface" : "inverseSurface"}
                hoverColor="onSurface"
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
  selectable: boolean;
};

export default SelectChips;
