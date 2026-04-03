// ---------------------------------------------------------------------------
// Messages Page — Phase 13, Area 6 (A6-5)
// /messages — Two-panel messaging interface
// ---------------------------------------------------------------------------

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { MessageThread } from "@/data/notificationTypes";
import { useMessages } from "@/hooks/useNotifications";
import {
  Archive,
  ArrowLeft,
  MessageSquare,
  Pin,
  PinOff,
  Plus,
  Search,
  Send,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Sample contacts for New Message modal
// ---------------------------------------------------------------------------
const SAMPLE_CONTACTS = [
  {
    id: "user-org2",
    name: "Amara Osei",
    org: "Nairobi Innovation Hub",
    threadId: "thread-001",
  },
  {
    id: "user-org3",
    name: "Ambassador Chen Fang",
    org: "Global Governance Alliance",
    threadId: "thread-002",
  },
  {
    id: "user-org4",
    name: "James Whitfield",
    org: "Nordic Council of Municipalities",
    threadId: "thread-005",
  },
  {
    id: "user-org5",
    name: "Dr. Yuki Tanaka",
    org: "Asia Pacific Cooperative Network",
    threadId: "thread-001",
  },
  {
    id: "user-org6",
    name: "Priya Mehta",
    org: "South Asian Development Consortium",
    threadId: "thread-003",
  },
];

// ---------------------------------------------------------------------------
// Thread type label + color
// ---------------------------------------------------------------------------
function ThreadTypeBadge({ type }: { type: MessageThread["type"] }) {
  if (type === "direct")
    return (
      <span
        className="text-[9px] font-medium px-1 py-0.5 rounded"
        style={{
          background: "oklch(0.72 0.16 200 / 0.15)",
          color: "oklch(0.72 0.16 200)",
        }}
      >
        DM
      </span>
    );
  if (type === "group")
    return (
      <span
        className="text-[9px] font-medium px-1 py-0.5 rounded"
        style={{
          background: "oklch(0.72 0.16 240 / 0.15)",
          color: "oklch(0.72 0.16 240)",
        }}
      >
        Group
      </span>
    );
  return (
    <span
      className="text-[9px] font-medium px-1 py-0.5 rounded"
      style={{
        background: "oklch(0.78 0.18 75 / 0.15)",
        color: "oklch(0.78 0.18 75)",
      }}
    >
      Announce
    </span>
  );
}

// ---------------------------------------------------------------------------
// Avatar letter circle
// ---------------------------------------------------------------------------
function AvatarCircle({
  name,
  size = "md",
}: { name: string; size?: "sm" | "md" }) {
  const letter = name.charAt(0).toUpperCase();
  // Generate a stable hue from the name
  let hue = 0;
  for (let i = 0; i < name.length; i++)
    hue = (hue + name.charCodeAt(i) * 37) % 360;
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ background: `oklch(0.55 0.18 ${hue})` }}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Thread display name helper
// ---------------------------------------------------------------------------
function threadDisplayName(
  thread: MessageThread,
  currentUserId: string,
): string {
  if (thread.name) return thread.name;
  const others = thread.participants.filter((p) => p.userId !== currentUserId);
  if (others.length === 0)
    return thread.participants[0]?.name ?? "Conversation";
  if (others.length === 1) return others[0].name;
  return (
    others
      .slice(0, 2)
      .map((p) => p.name.split(" ")[0])
      .join(", ") + (others.length > 2 ? ` +${others.length - 2}` : "")
  );
}

// ---------------------------------------------------------------------------
// New Message Modal
// ---------------------------------------------------------------------------
function NewMessageModal({
  onSelect,
  onClose,
}: { onSelect: (threadId: string) => void; onClose: () => void }) {
  const [contactSearch, setContactSearch] = useState("");
  const filtered = SAMPLE_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.org.toLowerCase().includes(contactSearch.toLowerCase()),
  );
  return (
    <DialogContent
      className="max-w-sm"
      style={{
        background: "oklch(var(--cosmos-mid))",
        border: "1px solid oklch(var(--gold) / 0.2)",
        color: "oklch(0.9 0.015 260)",
      }}
      data-ocid="messages.dialog"
    >
      <DialogHeader>
        <DialogTitle style={{ color: "oklch(var(--gold))" }}>
          New Conversation
        </DialogTitle>
      </DialogHeader>
      <div className="mt-2">
        <div className="relative mb-3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: "oklch(0.55 0.03 260)" }}
          />
          <input
            type="text"
            placeholder="Search contacts..."
            value={contactSearch}
            onChange={(e) => setContactSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "oklch(var(--cosmos-deep))",
              border: "1px solid oklch(var(--gold) / 0.15)",
              color: "oklch(0.9 0.015 260)",
            }}
            data-ocid="messages.search_input"
          />
        </div>
        <div className="flex flex-col gap-1">
          {filtered.map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => {
                onSelect(contact.threadId);
                onClose();
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-[oklch(var(--gold)/0.08)] w-full"
              data-ocid="messages.contact.button"
            >
              <AvatarCircle name={contact.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "oklch(0.9 0.015 260)" }}
                >
                  {contact.name}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "oklch(0.55 0.03 260)" }}
                >
                  {contact.org}
                </p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p
              className="text-sm text-center py-4"
              style={{ color: "oklch(0.55 0.03 260)" }}
            >
              No contacts found
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-xs"
          style={{ color: "oklch(0.65 0.03 260)" }}
          data-ocid="messages.cancel_button"
        >
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// ---------------------------------------------------------------------------
// Message Bubble
// ---------------------------------------------------------------------------
function MessageBubble({
  message,
}: { message: ReturnType<typeof useMessages>["activeMessages"][number] }) {
  if (message.isSystemMessage) {
    return (
      <div className="flex justify-center my-3" data-ocid="messages.row">
        <span
          className="text-xs italic px-3 py-1 rounded-full"
          style={{
            background: "oklch(0.25 0.02 260)",
            color: "oklch(0.55 0.03 260)",
          }}
        >
          {message.body}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 mb-3 ${
        message.isMine ? "flex-row-reverse" : "flex-row"
      }`}
      data-ocid="messages.row"
    >
      {!message.isMine && <AvatarCircle name={message.fromName} size="sm" />}
      <div
        className={`max-w-[70%] flex flex-col ${
          message.isMine ? "items-end" : "items-start"
        }`}
      >
        {!message.isMine && (
          <span
            className="text-xs mb-1"
            style={{ color: "oklch(0.55 0.03 260)" }}
          >
            {message.fromName}
          </span>
        )}
        <div
          className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
          style={{
            background: message.isMine
              ? "oklch(0.78 0.18 75 / 0.25)"
              : "oklch(var(--cosmos-mid))",
            border: message.isMine
              ? "1px solid oklch(0.78 0.18 75 / 0.35)"
              : "1px solid oklch(1 0 0 / 0.08)",
            color: "oklch(0.88 0.015 260)",
            borderTopRightRadius: message.isMine ? 4 : undefined,
            borderTopLeftRadius: message.isMine ? undefined : 4,
          }}
        >
          {message.body}
        </div>
        {message.reactions.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {message.reactions.map((r) => (
              <span
                key={r.emoji}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background: "oklch(0.25 0.02 260)",
                  color: "oklch(0.75 0.02 260)",
                }}
              >
                {r.emoji} {r.count}
              </span>
            ))}
          </div>
        )}
        <span
          className="text-[10px] mt-1"
          style={{ color: "oklch(0.45 0.02 260)" }}
        >
          {message.relativeTime}
        </span>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Thread List Panel
// ---------------------------------------------------------------------------
function ThreadListPanel({
  threads,
  activeThreadId,
  onSelect,
  totalUnread,
  searchValue,
  onSearchChange,
  onPin,
  onNewMessage,
}: {
  threads: ReturnType<typeof useMessages>["threads"];
  activeThreadId: string | null;
  onSelect: (id: string) => void;
  totalUnread: number;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onPin: (id: string) => void;
  onNewMessage: () => void;
}) {
  const CURRENT_USER = "user-org1";

  return (
    <div
      className="flex flex-col h-full"
      style={{ borderRight: "1px solid oklch(var(--gold) / 0.1)" }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid oklch(var(--gold) / 0.1)" }}
      >
        <div className="flex items-center gap-2">
          <h2
            className="text-base font-semibold"
            style={{ color: "oklch(var(--gold))" }}
          >
            Messages
          </h2>
          {totalUnread > 0 && (
            <Badge
              className="text-[10px] px-1.5 py-0 font-bold rounded-full"
              style={{
                background: "oklch(0.65 0.22 27)",
                color: "white",
                border: "none",
              }}
              data-ocid="messages.unread_count.button"
            >
              {totalUnread}
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 rounded-lg"
          style={{ color: "oklch(0.65 0.03 260)" }}
          onClick={onNewMessage}
          aria-label="New message"
          data-ocid="messages.open_modal_button"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 shrink-0">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: "oklch(0.5 0.03 260)" }}
          />
          <input
            type="text"
            placeholder="Search threads..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
            style={{
              background: "oklch(var(--cosmos-deep))",
              border: "1px solid oklch(var(--gold) / 0.12)",
              color: "oklch(0.85 0.015 260)",
            }}
            data-ocid="messages.search_input"
          />
        </div>
      </div>

      {/* Thread list */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-2 py-1">
          {threads.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-12 gap-2"
              data-ocid="messages.empty_state"
            >
              <MessageSquare
                className="h-8 w-8"
                style={{ color: "oklch(0.4 0.02 260)" }}
              />
              <p className="text-xs" style={{ color: "oklch(0.5 0.02 260)" }}>
                No conversations yet
              </p>
            </div>
          )}
          {threads.map((thread, idx) => {
            const name = threadDisplayName(thread, CURRENT_USER);
            const isActive = thread.id === activeThreadId;
            const lastBody = thread.lastMessage?.body ?? "";
            const preview =
              lastBody.length > 45 ? `${lastBody.slice(0, 45)}…` : lastBody;
            const time = thread.lastMessage
              ? (() => {
                  const diff =
                    Date.now() - new Date(thread.lastMessage.sentAt).getTime();
                  const mins = Math.floor(diff / 60000);
                  if (mins < 1) return "now";
                  if (mins < 60) return `${mins}m`;
                  const hrs = Math.floor(mins / 60);
                  if (hrs < 24) return `${hrs}h`;
                  return `${Math.floor(hrs / 24)}d`;
                })()
              : "";

            return (
              <motion.button
                key={thread.id}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onSelect(thread.id)}
                className="w-full flex items-start gap-2.5 px-2 py-2.5 rounded-xl text-left transition-all duration-150 group relative mb-0.5"
                style={{
                  background: isActive
                    ? "oklch(var(--gold) / 0.08)"
                    : "transparent",
                  borderLeft: isActive
                    ? "2px solid oklch(var(--gold))"
                    : "2px solid transparent",
                }}
                data-ocid={`messages.item.${idx + 1}`}
                aria-label={`Open conversation: ${name}`}
              >
                <AvatarCircle name={name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span
                      className="text-sm font-medium truncate flex-1"
                      style={{
                        color: isActive
                          ? "oklch(var(--gold))"
                          : "oklch(0.88 0.015 260)",
                      }}
                    >
                      {name}
                    </span>
                    {thread.isPinned && (
                      <Pin
                        className="h-3 w-3 shrink-0"
                        style={{ color: "oklch(0.72 0.16 200)" }}
                      />
                    )}
                    <span
                      className="text-[10px] shrink-0"
                      style={{ color: "oklch(0.45 0.02 260)" }}
                    >
                      {time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThreadTypeBadge type={thread.type} />
                    <span
                      className="text-xs truncate flex-1"
                      style={{ color: "oklch(0.52 0.02 260)" }}
                    >
                      {preview}
                    </span>
                    {thread.unreadCount > 0 && (
                      <span
                        className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[9px] font-bold text-white shrink-0"
                        style={{ background: "oklch(0.65 0.22 27)" }}
                      >
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover pin button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin(thread.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-0.5 rounded transition-opacity"
                  style={{ color: "oklch(0.55 0.03 260)" }}
                  aria-label={thread.isPinned ? "Unpin thread" : "Pin thread"}
                  data-ocid="messages.toggle"
                >
                  {thread.isPinned ? (
                    <PinOff className="h-3 w-3" />
                  ) : (
                    <Pin className="h-3 w-3" />
                  )}
                </button>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat View Panel
// ---------------------------------------------------------------------------
function ChatViewPanel({
  thread,
  messages,
  newBody,
  onBodyChange,
  onSend,
  isSending,
  onArchive,
  onPin,
  onBack,
}: {
  thread: ReturnType<typeof useMessages>["activeThread"];
  messages: ReturnType<typeof useMessages>["activeMessages"];
  newBody: string;
  onBodyChange: (v: string) => void;
  onSend: () => void;
  isSending: boolean;
  onArchive: (id: string) => void;
  onPin: (id: string) => void;
  onBack: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const CURRENT_USER = "user-org1";

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  if (!thread) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center gap-4"
        data-ocid="messages.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "oklch(0.72 0.16 200 / 0.1)",
              border: "1px solid oklch(0.72 0.16 200 / 0.2)",
            }}
          >
            <MessageSquare
              className="h-8 w-8"
              style={{ color: "oklch(0.72 0.16 200)" }}
            />
          </div>
          <div className="text-center">
            <h3
              className="text-base font-semibold"
              style={{ color: "oklch(0.75 0.015 260)" }}
            >
              Select a conversation
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.5 0.02 260)" }}
            >
              Choose a thread from the list to start messaging
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const participantCount = thread.participants.length;
  const threadName =
    thread.name ??
    (thread.participants
      .filter((p) => p.userId !== CURRENT_USER)
      .map((p) => p.name)
      .join(", ") ||
      "Conversation");

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid oklch(var(--gold) / 0.1)" }}
      >
        {/* Mobile back */}
        <button
          type="button"
          onClick={onBack}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[oklch(var(--gold)/0.08)]"
          style={{ color: "oklch(0.65 0.03 260)" }}
          aria-label="Back to thread list"
          data-ocid="messages.secondary_button"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="text-sm font-semibold truncate"
              style={{ color: "oklch(0.9 0.015 260)" }}
            >
              {threadName}
            </h3>
            <ThreadTypeBadge type={thread.type} />
          </div>
          {participantCount > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Users
                className="h-3 w-3"
                style={{ color: "oklch(0.5 0.02 260)" }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.5 0.02 260)" }}
              >
                {participantCount} participant
                {participantCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPin(thread.id)}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[oklch(var(--gold)/0.08)]"
            style={{
              color: thread.isPinned
                ? "oklch(0.72 0.16 200)"
                : "oklch(0.5 0.03 260)",
            }}
            aria-label={thread.isPinned ? "Unpin" : "Pin conversation"}
            data-ocid="messages.toggle"
          >
            {thread.isPinned ? (
              <PinOff className="h-3.5 w-3.5" />
            ) : (
              <Pin className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onArchive(thread.id)}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[oklch(0.65_0.22_27/0.12)]"
            style={{ color: "oklch(0.5 0.03 260)" }}
            aria-label="Archive conversation"
            data-ocid="messages.delete_button"
          >
            <Archive className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Message bubbles */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center h-full gap-2"
            data-ocid="messages.empty_state"
          >
            <MessageSquare
              className="h-6 w-6"
              style={{ color: "oklch(0.4 0.02 260)" }}
            />
            <p className="text-xs" style={{ color: "oklch(0.5 0.02 260)" }}>
              No messages yet. Start the conversation!
            </p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Send input */}
      <div
        className="px-4 py-3 flex items-end gap-2 shrink-0"
        style={{ borderTop: "1px solid oklch(var(--gold) / 0.1)" }}
      >
        <Textarea
          value={newBody}
          onChange={(e) => onBodyChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message... (Enter to send, Shift+Enter for newline)"
          rows={1}
          className="flex-1 resize-none text-sm rounded-xl py-2 px-3 min-h-[38px] max-h-32"
          style={{
            background: "oklch(var(--cosmos-deep))",
            border: "1px solid oklch(var(--gold) / 0.2)",
            color: "oklch(0.88 0.015 260)",
            lineHeight: 1.5,
          }}
          disabled={isSending}
          data-ocid="messages.textarea"
        />
        <Button
          size="sm"
          onClick={onSend}
          disabled={!newBody.trim() || isSending}
          className="h-9 w-9 p-0 rounded-xl shrink-0"
          style={{
            background:
              newBody.trim() && !isSending
                ? "oklch(var(--gold))"
                : "oklch(0.3 0.02 260)",
            color:
              newBody.trim() && !isSending
                ? "oklch(0.15 0.02 260)"
                : "oklch(0.45 0.02 260)",
          }}
          aria-label="Send message"
          data-ocid="messages.submit_button"
        >
          {isSending ? (
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MessagesPage — main export
// ---------------------------------------------------------------------------
export function MessagesPage() {
  const CURRENT_USER = "user-org1";
  const {
    threads,
    activeThread,
    activeMessages,
    totalUnreadThreads,
    selectThread,
    sendMessage,
    archiveThread,
    pinThread,
    updateFilter,
    isSending,
    newMessageBody,
    setNewMessageBody,
  } = useMessages(CURRENT_USER);

  const [search, setSearch] = useState("");
  const [newMsgModalOpen, setNewMsgModalOpen] = useState(false);
  // On mobile, show chat view when a thread is selected
  const [mobileShowChat, setMobileShowChat] = useState(false);

  function handleSearchChange(v: string) {
    setSearch(v);
    updateFilter({ search: v });
  }

  function handleSelectThread(id: string) {
    selectThread(id);
    setMobileShowChat(true);
  }

  function handleBack() {
    setMobileShowChat(false);
  }

  function handleSend() {
    if (activeThread && newMessageBody.trim()) {
      sendMessage(activeThread.id, newMessageBody);
    }
  }

  function handleNewMessageSelect(threadId: string) {
    handleSelectThread(threadId);
    setNewMsgModalOpen(false);
  }

  return (
    <main
      className="flex flex-col"
      style={{
        background: "oklch(var(--cosmos-deep))",
        minHeight: "calc(100vh - 4rem)",
      }}
      data-ocid="messages.page"
    >
      {/* Page header */}
      <div
        className="px-4 sm:px-6 py-4 shrink-0 flex items-center justify-between"
        style={{ borderBottom: "1px solid oklch(var(--gold) / 0.12)" }}
      >
        <div>
          <div className="flex items-center gap-2">
            <h1
              className="text-xl font-bold"
              style={{ color: "oklch(var(--gold))" }}
            >
              Communication Hub
            </h1>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(0.72 0.16 200 / 0.15)",
                color: "oklch(0.72 0.16 200)",
              }}
            >
              Phase 13 · Comms
            </span>
          </div>
          <p
            className="text-sm mt-0.5"
            style={{ color: "oklch(0.55 0.03 260)" }}
          >
            Direct messages, group threads, and platform announcements
          </p>
        </div>
        <Dialog open={newMsgModalOpen} onOpenChange={setNewMsgModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="hidden sm:flex items-center gap-1.5 text-xs"
              style={{
                background: "oklch(var(--gold))",
                color: "oklch(0.15 0.02 260)",
              }}
              data-ocid="messages.open_modal_button"
            >
              <Plus className="h-3.5 w-3.5" />
              New Message
            </Button>
          </DialogTrigger>
          <NewMessageModal
            onSelect={handleNewMessageSelect}
            onClose={() => setNewMsgModalOpen(false)}
          />
        </Dialog>
      </div>

      {/* Two-panel layout */}
      <div
        className="flex flex-1 min-h-0"
        style={{ height: "calc(100vh - 9rem)" }}
      >
        {/* Thread list — hidden on mobile when chat is active */}
        <div
          className={`w-full md:w-80 shrink-0 flex flex-col ${
            mobileShowChat ? "hidden md:flex" : "flex"
          }`}
        >
          <Dialog open={newMsgModalOpen} onOpenChange={setNewMsgModalOpen}>
            <ThreadListPanel
              threads={threads}
              activeThreadId={activeThread?.id ?? null}
              onSelect={handleSelectThread}
              totalUnread={totalUnreadThreads}
              searchValue={search}
              onSearchChange={handleSearchChange}
              onPin={pinThread}
              onNewMessage={() => setNewMsgModalOpen(true)}
            />
            <NewMessageModal
              onSelect={handleNewMessageSelect}
              onClose={() => setNewMsgModalOpen(false)}
            />
          </Dialog>
        </div>

        {/* Chat view — full width on mobile when active */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${
            !mobileShowChat ? "hidden md:flex" : "flex"
          }`}
        >
          <ChatViewPanel
            thread={activeThread}
            messages={activeMessages}
            newBody={newMessageBody}
            onBodyChange={setNewMessageBody}
            onSend={handleSend}
            isSending={isSending}
            onArchive={archiveThread}
            onPin={pinThread}
            onBack={handleBack}
          />
        </div>
      </div>
    </main>
  );
}
