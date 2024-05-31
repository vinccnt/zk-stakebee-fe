import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function StatsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="rounded-3xl bg-[#AE96FC] p-6 data-[state=open]:rounded-b-none ">
          STMETIS = 3,062.5
        </AccordionTrigger>
        <AccordionContent className="rounded-3xl rounded-t-none bg-[#AE96FC] px-6 ">
          <div className="font-helvetica flex flex-col  gap-y-2">
            <div className="flex justify-between">
              <span>APR</span>
              <span>12%</span>
            </div>

            <div className="flex justify-between">
              <span>Exchange Rate</span>
              <span>1 METIS = 1STMETIS</span>
            </div>

            <div className="flex justify-between">
              <span>Transaction Cost</span>
              <span>~$4.5</span>
            </div>

            <div className="flex justify-between">
              <span>Reward Fee</span>
              <span>10%</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
