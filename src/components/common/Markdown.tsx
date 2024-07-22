import ReactMarkdown from 'react-markdown'

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className="bg-white p-4 rounded">
      <ReactMarkdown className="flex flex-col gap-4">{content}</ReactMarkdown>
    </div>
  )
}
