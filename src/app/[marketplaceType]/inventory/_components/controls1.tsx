'use client';

// import { SearchInput } from '~/components/ui/Input/input';
import { cn } from '~/lib/utils';

const InventoryControls = () => {
  //const { listedOnly, toggleListedOnly } = useInventory();

  // const debouncedSearch = debounce(
  //   { delay: 500 },
  //   ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
  //     inventory$.setSearchText(value);
  //   },
  // );

  // useEffect(() => {
  //   return () => {
  //     inventory$.setSearchText('');
  //   };
  // }, []);

  return (
    <div
      className={cn(
        'flex-col-reverse md:flex-row!',
        'flex items-center justify-between gap-4',
      )}
    >
      <div className="flex flex-1 relative w-full md:w-auto!">
        {/* //TODO: add search input back in after adding search to use
        <SearchInput
          onChange={(e) => debouncedSearch(e)}
          placeholder="Search collection or item"
          className={cn('rounded-[8px]', 'w-full sm:w-1/2! md:w-2/5!')}
        /> */}
      </div>

      {/**<div className="flex items-center space-x-2 w-full md:w-auto!">
        <Label
          className="text-sm font-bold text-primary"
          htmlFor={'listedOnly'}
        >
          Listed items only
        </Label>  

        <Switch
          id={'listedOnly'}
          checked={listedOnly}
          onCheckedChange={toggleListedOnly}
        />
      </div> */}
    </div>
  );
};

export default InventoryControls;
