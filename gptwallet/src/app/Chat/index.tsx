"use client";

import { useState, useEffect } from "react";
import { truncate } from "../helpers/truncate";
import { accountsToDisplay } from "@/pages/api/openai";

type Balances = Record<string, string>[];

export const Chat = () => {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<Balances>([]);

  const showBalances = async () => {
    const bals = await accountsToDisplay();
    setBalances(bals);
  };

  useEffect(() => {
    if (!loading) {
      showBalances();
    }
  }, [loading]);

  const getChat = async () => {
    setLoading(true);
    await fetch("/api/openai", { method: "POST", body: chat });
    setLoading(false);
  };

  return (
    <>
      <div className="mb-20">
        {balances.map((balance, index) =>
          Object.entries(balance).map(([account, balance]) => (
            <div
              key={account}
              style={{
                fontWeight: index === 0 ? "bold" : "normal",
                fontVariantNumeric: "tabular-nums",
                fontFamily: "monospace",
              }}
            >
              {truncate(account)}: {balance}
            </div>
          ))
        )}
      </div>
      <form className="w-full max-w-lg">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none max-w-lg"
            type="text"
            placeholder="Tell gpt what to do..."
            aria-label="chat input"
            onChange={(e) => setChat(e.target.value)}
            value={chat}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={getChat}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => setChat("")}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};
