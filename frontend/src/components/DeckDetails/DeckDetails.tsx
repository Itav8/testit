interface DeckDetailsProps {
  deckName: string;
  children: React.ReactNode
}

export const DeckDetails = (props: DeckDetailsProps) => {
  return (
    <>
    <div>
      <h1>{props.deckName}</h1>
      <div>
        {props.children}
      </div>
    </div>
    </>
  )
}
