import React, { useState } from "react";
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
// RECTIFIED: Added CSS import
import { CSS } from "@dnd-kit/utilities";

const BLOCK_TYPES = {
  D: { label: "Division", color: "#3B82F6", symbol: "÷" },
  M: { label: "Multiplication", color: "#8B5CF6", symbol: "×" },
  A: { label: "Addition", color: "#10B981", symbol: "+" },
  S: { label: "Subtraction", color: "#F43F5E", symbol: "−" },
};

const PALETTE_ITEMS = ["D", "M", "A", "S"];

// 1. DRAGGABLE PIECE (For Palette)
function DraggableBlock({ id, type, isPalette = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
  });

  const config = BLOCK_TYPES[type];

  const style = {
    // RECTIFIED: Use Translate instead of Transform to fix the "too large" issue
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    backgroundColor: config.color,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.8 : 1,
    ...styles.puzzlePiece,
    ...styles.palettePiece,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={styles.blockContent}>
        <span style={styles.symbol}>{config.symbol}</span>
        <div style={styles.textContainer}>
          <span style={styles.blockLabel}>{config.label}</span>
        </div>
      </div>
      <div style={{ ...styles.puzzleGrooveBottom, backgroundColor: config.color }} />
    </div>
  );
}

// 2. SORTABLE PIECE (For Workspace)
function SortableBlock({ block, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block.id,
  });

  const config = BLOCK_TYPES[block.type];

  const style = {
    // RECTIFIED: Use Translate instead of Transform to fix the "too large" issue
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    backgroundColor: config.color,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.5 : 1,
    ...styles.puzzlePiece,
    ...styles.workspacePiece,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* Puzzle Interlock Top */}
      <div style={styles.puzzleTabTop} />
      
      <div style={styles.blockContent}>
        <span style={styles.symbol}>{config.symbol}</span>
        <div style={styles.textContainer}>
          <span style={styles.blockLabel}>{config.label}</span>
        </div>
        <button
          style={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
        >✕</button>
      </div>
      {/* Puzzle Interlock Bottom */}
      <div style={{ ...styles.puzzleGrooveBottom, backgroundColor: config.color }} />
    </div>
  );
}

// 3. DROP ZONE
function WorkspaceArea({ children, isEmpty }) {
  const { setNodeRef, isOver } = useDroppable({ id: "workspace-drop" });

  const style = {
    ...styles.workspace,
    backgroundColor: isOver ? "#F1F5F9" : "#F8FAFC",
    borderColor: isOver ? "#11306D" : "#E2E8F0",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {isEmpty && (
        <div style={styles.emptyState}>
          <p>Drag math blocks here and drag them to reorder</p>
        </div>
      )}
      <div style={styles.stackContainer}>{children}</div>
    </div>
  );
}

// 4. MAIN COMPONENT
export default function BlockCoding() {
  const [workspaceBlocks, setWorkspaceBlocks] = useState([]); 
  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // RECTIFIED: Increased to 8 for better button click detection
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // A. Add from palette to workspace
    if (active.id.toString().includes("palette") && over.id === "workspace-drop") {
      const type = active.id.toString().split("-")[0];
      const newBlock = { id: `block-${Date.now()}`, type };
      setWorkspaceBlocks((prev) => [...prev, newBlock]);
      return;
    }

    // B. Reorder existing blocks in workspace
    if (active.id !== over.id && !active.id.toString().includes("palette")) {
      const oldIndex = workspaceBlocks.findIndex((b) => b.id === active.id);
      const newIndex = workspaceBlocks.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setWorkspaceBlocks((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
    setMessage("");
  };

  const removeBlock = (blockId) => {
    setWorkspaceBlocks((prev) => prev.filter((b) => b.id !== blockId));
  };

  const validateDMAS = () => {
    const sequence = workspaceBlocks.map(b => b.type).join("");
    if (sequence === "DMAS") {
      setMessage("✅ Logic Correct: Division → Multiplication → Addition → Subtraction");
    } else if (sequence === "") {
      setMessage("⚠️ Workspace is empty.");
    } else {
      setMessage("❌ Incorrect sequence. Remember the DMAS rule order.");
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={styles.mainLayout}>
        
        <div style={styles.palettePanel}>
          <h3 style={styles.panelTitle}>Palette</h3>
          <p style={styles.panelSub}>Drag to add</p>
          <div style={styles.paletteList}>
            {PALETTE_ITEMS.map((type) => (
              <DraggableBlock key={`${type}-palette`} id={`${type}-palette`} type={type} />
            ))}
          </div>
        </div>

        <div style={styles.workspaceWrapper}>
          <div style={styles.header}>
            <h3 style={styles.panelTitle}>Logic Pipeline</h3>
            <div style={styles.actionGroup}>
              <button onClick={validateDMAS} style={styles.runBtn}>Verify Order</button>
              <button onClick={() => setWorkspaceBlocks([])} style={styles.clearBtn}>Clear All</button>
            </div>
          </div>

          <WorkspaceArea isEmpty={workspaceBlocks.length === 0}>
            <SortableContext items={workspaceBlocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {workspaceBlocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  onDelete={removeBlock}
                />
              ))}
            </SortableContext>
          </WorkspaceArea>

          {message && (
            <div style={{
              ...styles.message,
              backgroundColor: message.includes("✅") ? "#DCFCE7" : "#FEE2E2",
              color: message.includes("✅") ? "#166534" : "#B91C1C"
            }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

const styles = {
  mainLayout: { display: "flex", gap: "30px", padding: "10px", background: "#fff", fontFamily: "'Inter', sans-serif" },
  palettePanel: { width: "240px", background: "#F8FAFC", padding: "20px", borderRadius: "20px", border: "1px solid #E2E8F0" },
  panelTitle: { fontSize: "17px", fontWeight: "800", color: "#11306D", marginBottom: "5px" },
  panelSub: { fontSize: "11px", color: "#94A3B8", marginBottom: "25px", textTransform: "uppercase" },
  paletteList: { display: "flex", flexDirection: "column", gap: "12px" },
  workspaceWrapper: { flex: 1, display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  workspace: { flex: 1, minHeight: "450px", border: "2px solid #E2E8F0", borderRadius: "24px", padding: "40px", position: "relative", backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "20px 20px" },
  stackContainer: { display: "flex", flexDirection: "column", alignItems: "center" },
  emptyState: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#94A3B8", textAlign: "center" },
  puzzlePiece: { width: "260px", height: "55px", color: "#fff", display: "flex", alignItems: "center", position: "relative", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", userSelect: "none" },
  palettePiece: { borderRadius: "10px", cursor: "grab" },
  workspacePiece: { marginBottom: "6px", borderRadius: "6px", cursor: "grab" },
  blockContent: { width: "100%", display: "flex", alignItems: "center", padding: "0 15px", gap: "10px" },
  symbol: { fontSize: "22px", fontWeight: "900" },
  textContainer: { flex: 1 },
  blockLabel: { fontSize: "13px", fontWeight: "700" },
  puzzleTabTop: { position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "36px", height: "10px", background: "#F8FAFC", borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", zIndex: 5 },
  puzzleGrooveBottom: { position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", width: "36px", height: "10px", borderRadius: "0 0 10px 10px", zIndex: 4 },
  runBtn: { padding: "10px 20px", background: "#11306D", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" },
  clearBtn: { padding: "10px 20px", background: "#fff", border: "1px solid #E2E8F0", color: "#64748B", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  deleteBtn: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", cursor: "pointer", fontSize: "10px" },
  message: { marginTop: "20px", padding: "15px", borderRadius: "12px", fontWeight: "700", textAlign: "center" }
};