import { Font, Icons, Layout as L } from "@design-system";
import React, { useState } from "react";
import { useTheme } from "styled-components";

const SelectChips = ({ options, onSelect }: SelectChipsProps) => {
  const theme = useTheme();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const canGoNext = selectedIdx !== null;

  return (
    <L.FlexCol w={"100%"}>
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
              outline={"inverseSurface"}
              onClick={() => setSelectedIdx((p) => (p === idx ? null : idx))}
            >
              <Font.Body
                type={"14_medium_single"}
                color={selected ? "inverseOnSurface" : "inverseSurface"}
              >
                {option.text}
              </Font.Body>
            </L.FlexRow>
          );
        })}
      </L.FlexRow>
      <L.FlexRow
        alignItems="center"
        w={"100%"}
        justifyContent="center"
        gap={10}
        pt={40}
      >
        <L.LayoutBase
          onClick={
            canGoNext ? () => onSelect(options[selectedIdx].value) : undefined
          }
          bgColor={canGoNext ? "primary" : "secondaryContainer"}
          pv={15}
          w={"80%"}
          ph={30}
          rounded={10}
          alignItems="center"
        >
          <Font.Body
            type={"16_medium_single"}
            ml={2}
            color={canGoNext ? "onPrimary" : "onSecondaryContainer"}
          >
            continue
          </Font.Body>
        </L.LayoutBase>
      </L.FlexRow>
    </L.FlexCol>
  );
};

type SelectChipsProps<T = any> = {
  options: { value: T; text: string }[];
  onSelect: (option: T) => void;
};

export default React.memo(SelectChips);
