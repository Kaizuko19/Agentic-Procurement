const workflowNodes = [
  {
    id: "start",
    type: "start",
    x: 40,
    y: 120,
    title: "Administrator opens Criteria Setup",
    description: "Start of PO Compliance Agent configuration."
  },
  {
    id: "defineCerts",
    type: "action",
    x: 40,
    y: 270,
    title: "Define certification criteria",
    description: "Set required certifications by vendor type, category, region, and document type."
  },
  {
    id: "defineControls",
    type: "action",
    x: 40,
    y: 420,
    title: "Encode vendor and policy controls",
    description: "Block inactive or suspended vendors; validate GST; enforce spend thresholds and approval levels."
  },
  {
    id: "alertMatrix",
    type: "action",
    x: 40,
    y: 570,
    title: "Configure alert and blocking matrix",
    description: "Map expired certifications, GST mismatches, spend gaps, and inactive vendors to recipients, timing, and outcomes."
  },
  {
    id: "activateCriteria",
    type: "input",
    x: 40,
    y: 720,
    title: "Activate versioned criteria set",
    description: "Saved criteria versions are activated or deactivated and applied automatically to BC POs."
  },
  {
    id: "bcTrigger",
    type: "input",
    x: 360,
    y: 120,
    title: "BC PO creation or approval trigger",
    description: "Validation runs during PO creation or when an approval request is submitted in BC."
  },
  {
    id: "loadData",
    type: "action",
    x: 360,
    y: 290,
    title: "Load BC vendor and PO snapshot",
    description: "Read vendor status, required certifications, GST profile, regulatory needs, active PO link, value, budget, and approver context."
  },
  {
    id: "runChecks",
    type: "action",
    x: 360,
    y: 470,
    title: "Evaluate all active rules",
    description: "Check certifications, expiry dates, vendor risk, GST compliance, regulatory documents, budget, spend approvals, restricted items, and evidence attachments."
  },
  {
    id: "ruleResults",
    type: "output",
    x: 360,
    y: 650,
    title: "Produce pass, warning, fail, and hard-stop results",
    description: "Each result includes the rule, finding, required fix, decision, PO reference, timestamp, and user context."
  },
  {
    id: "allCompliant",
    type: "decision",
    x: 720,
    y: 636,
    title: "All required checks pass?",
    description: "No blocking failures, required approvals present, and evidence sufficient."
  },
  {
    id: "allowProceed",
    type: "action",
    x: 1010,
    y: 500,
    title: "Allow PO to proceed",
    description: "PO creation, final approval, or release can continue in BC."
  },
  {
    id: "logPass",
    type: "report",
    x: 1290,
    y: 500,
    title: "Log compliant outcome",
    description: "Write pass status and evaluated rules to the PO compliance log."
  },
  {
    id: "classifyIssue",
    type: "decision",
    x: 720,
    y: 980,
    title: "Which non-compliance condition applies?",
    description: "Route the PO after AI alternatives are proposed."
  },
  {
    id: "aiAlternatives",
    type: "ai",
    x: 720,
    y: 820,
    title: "AI provides alternatives",
    description: "When the BC PO does not meet admin criteria, AI suggests compliant suppliers, corrected evidence, approval routes, or policy-safe substitutes."
  },
  {
    id: "expiredCert",
    type: "exception",
    x: 1010,
    y: 780,
    title: "Expired certification",
    description: "Hard stop when certificate expiry is before PO creation, receipt, or approval date."
  },
  {
    id: "gstMismatch",
    type: "exception",
    x: 1010,
    y: 930,
    title: "GST mismatch",
    description: "Cross-check legal entity, country code, tax profile, and attached proof; escalate discrepancy."
  },
  {
    id: "approvalGap",
    type: "exception",
    x: 1010,
    y: 1080,
    title: "Spend or restricted-item approval gap",
    description: "Reroute if spend threshold, cost center, approval level, or secondary compliance approval is missing."
  },
  {
    id: "vendorHold",
    type: "exception",
    x: 1010,
    y: 1230,
    title: "Inactive, suspended, or risky vendor",
    description: "Hold or prevent PO creation for inactive vendors or vendors under risk review."
  },
  {
    id: "warningReview",
    type: "exception",
    x: 480,
    y: 1130,
    title: "Warning or evidence review",
    description: "Flag upcoming expiries, regulated commodities, or partial quotation and approval attachments."
  },
  {
    id: "blockAndNotify",
    type: "action",
    x: 1290,
    y: 930,
    title: "Apply configured outcome and notify recipients",
    description: "Block approval, send alert, escalate, reroute, or hold based on the active matrix."
  },
  {
    id: "remediate",
    type: "action",
    x: 1570,
    y: 930,
    title: "Resolve exception or select alternative",
    description: "Upload renewed certificate, request exception, correct GST data, add required approver, accept an AI alternative, attach evidence, or update vendor status."
  },
  {
    id: "logException",
    type: "report",
    x: 1290,
    y: 1110,
    title: "Log notification and exception handling",
    description: "Record failed rule, message, recipient, action, PO reference, timestamp, and user context in BC."
  },
  {
    id: "policyReport",
    type: "report",
    x: 1570,
    y: 500,
    title: "Generate policy adherence report",
    description: "Report lists POs with pass/fail status, clear reasons, procurement rule matrix, and escalation status."
  },
  {
    id: "evidenceBundle",
    type: "report",
    x: 1570,
    y: 680,
    title: "Assemble BC evidence bundle",
    description: "Collect compliance logs, approvals, quotations, certifications, GST proof, regulatory documents, and policy decisions."
  },
  {
    id: "attachExport",
    type: "output",
    x: 1570,
    y: 1110,
    title: "Attach evidence and stage exports",
    description: "Link evidence to standard BC PO and vendor pages; stage PDF and Excel outputs for external audit."
  },
  {
    id: "end",
    type: "end",
    x: 1570,
    y: 1260,
    title: "Audit-ready PO compliance record",
    description: "Final auditable state for compliant or resolved PO."
  }
];

const workflowEdges = [
  { from: "start", to: "defineCerts" },
  { from: "defineCerts", to: "defineControls" },
  { from: "defineControls", to: "alertMatrix" },
  { from: "alertMatrix", to: "activateCriteria" },
  {
    from: "activateCriteria",
    to: "bcTrigger",
    label: "Active criteria applied",
    fromSide: "right",
    toSide: "left",
    waypoints: [{ x: 310, y: 772 }, { x: 310, y: 172 }]
  },
  { from: "bcTrigger", to: "loadData" },
  { from: "loadData", to: "runChecks" },
  { from: "runChecks", to: "ruleResults" },
  { from: "ruleResults", to: "allCompliant", fromSide: "right", toSide: "left" },
  { from: "allCompliant", to: "allowProceed", label: "Yes", tone: "success", fromSide: "right", toSide: "left", waypoints: [{ x: 970, y: 700 }, { x: 970, y: 552 }] },
  { from: "allowProceed", to: "logPass" },
  { from: "logPass", to: "policyReport" },
  { from: "allCompliant", to: "aiAlternatives", label: "No", tone: "exception", fromSide: "bottom", toSide: "top" },
  { from: "aiAlternatives", to: "classifyIssue", label: "Alternatives proposed", tone: "warning", fromSide: "bottom", toSide: "top" },
  { from: "classifyIssue", to: "expiredCert", label: "Certificate", tone: "exception", fromSide: "top", toSide: "left", waypoints: [{ x: 830, y: 832 }, { x: 960, y: 832 }] },
  { from: "classifyIssue", to: "gstMismatch", label: "GST", tone: "exception", fromSide: "right", toSide: "left" },
  { from: "classifyIssue", to: "approvalGap", label: "Policy", tone: "exception", fromSide: "bottom", toSide: "left", waypoints: [{ x: 830, y: 1132 }, { x: 960, y: 1132 }] },
  { from: "classifyIssue", to: "vendorHold", label: "Vendor", tone: "exception", fromSide: "bottom", toSide: "left", waypoints: [{ x: 830, y: 1282 }, { x: 960, y: 1282 }] },
  { from: "classifyIssue", to: "warningReview", label: "Warning", tone: "warning", fromSide: "left", toSide: "right", waypoints: [{ x: 700, y: 1182 }] },
  { from: "expiredCert", to: "blockAndNotify", tone: "exception", fromSide: "right", toSide: "left", waypoints: [{ x: 1265, y: 832 }, { x: 1265, y: 982 }] },
  { from: "gstMismatch", to: "blockAndNotify", tone: "exception", fromSide: "right", toSide: "left" },
  { from: "approvalGap", to: "blockAndNotify", tone: "exception", fromSide: "right", toSide: "left", waypoints: [{ x: 1265, y: 1132 }, { x: 1265, y: 982 }] },
  { from: "vendorHold", to: "blockAndNotify", tone: "exception", fromSide: "right", toSide: "left", waypoints: [{ x: 1265, y: 1282 }, { x: 1265, y: 982 }] },
  { from: "warningReview", to: "blockAndNotify", tone: "warning", fromSide: "right", toSide: "left", waypoints: [{ x: 760, y: 1182 }, { x: 760, y: 982 }] },
  { from: "blockAndNotify", to: "remediate" },
  { from: "blockAndNotify", to: "logException" },
  {
    from: "remediate",
    to: "runChecks",
    label: "Revalidate",
    tone: "warning",
    fromSide: "bottom",
    toSide: "right",
    waypoints: [{ x: 1685, y: 1380 }, { x: 610, y: 1380 }, { x: 610, y: 522 }]
  },
  { from: "logException", to: "policyReport", fromSide: "right", toSide: "right", waypoints: [{ x: 1540, y: 1162 }, { x: 1840, y: 1162 }, { x: 1840, y: 552 }] },
  { from: "policyReport", to: "evidenceBundle" },
  { from: "evidenceBundle", to: "attachExport", fromSide: "bottom", toSide: "top" },
  { from: "attachExport", to: "end" }
];

const nodeLayer = document.getElementById("workflowNodes");
const edgeLayer = document.getElementById("workflowEdges");

const nodeById = new Map(workflowNodes.map((node) => [node.id, node]));

function renderNodes() {
  nodeLayer.innerHTML = workflowNodes.map((node) => `
    <article class="workflow-node ${node.type}" style="left:${node.x}px; top:${node.y}px" aria-label="${node.title}">
      <div class="node-kicker">${node.type.replace("-", " ")}</div>
      <div class="node-title">${node.title}</div>
      <div class="node-description">${node.description}</div>
    </article>
  `).join("");
}

function anchor(node, side) {
  const width = node.type === "decision" ? 220 : 230;
  const height = node.type === "decision" ? 128 : 104;
  const centerX = node.x + width / 2;
  const centerY = node.y + height / 2;
  if (side === "left") return { x: node.x, y: centerY };
  if (side === "right") return { x: node.x + width, y: centerY };
  if (side === "top") return { x: centerX, y: node.y };
  if (side === "bottom") return { x: centerX, y: node.y + height };
  return { x: centerX, y: centerY };
}

function edgePoints(edge) {
  const from = nodeById.get(edge.from);
  const to = nodeById.get(edge.to);
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const fromSide = edge.fromSide || (Math.abs(dx) > Math.abs(dy) ? (dx >= 0 ? "right" : "left") : (dy >= 0 ? "bottom" : "top"));
  const toSide = edge.toSide || (Math.abs(dx) > Math.abs(dy) ? (dx >= 0 ? "left" : "right") : (dy >= 0 ? "top" : "bottom"));
  return { start: anchor(from, fromSide), end: anchor(to, toSide) };
}

function insetPoint(point, toward, distance = 12) {
  const dx = toward.x - point.x;
  const dy = toward.y - point.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (!length) return point;
  return {
    x: point.x + (dx / length) * distance,
    y: point.y + (dy / length) * distance
  };
}

function pathFor(edge) {
  const { start, end } = edgePoints(edge);
  if (edge.waypoints && edge.waypoints.length) {
    const routeEnd = insetPoint(end, edge.waypoints[edge.waypoints.length - 1]);
    const routedPoints = [start, ...edge.waypoints, routeEnd];
    return routedPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  }
  const routeEnd = insetPoint(end, start);
  const horizontal = Math.abs(end.x - start.x) >= Math.abs(end.y - start.y);
  if (horizontal) {
    const midX = start.x + (routeEnd.x - start.x) / 2;
    return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${routeEnd.y}, ${routeEnd.x} ${routeEnd.y}`;
  }
  const midY = start.y + (routeEnd.y - start.y) / 2;
  return `M ${start.x} ${start.y} C ${start.x} ${midY}, ${routeEnd.x} ${midY}, ${routeEnd.x} ${routeEnd.y}`;
}

function labelPoint(edge) {
  const { start, end } = edgePoints(edge);
  return {
    x: start.x + (end.x - start.x) / 2,
    y: start.y + (end.y - start.y) / 2 - 8
  };
}

function renderEdges() {
  edgeLayer.setAttribute("viewBox", "0 0 1880 1420");
  edgeLayer.innerHTML = `
    <defs>
      <marker id="arrowDefault" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5.5 L 0 11 z" fill="#65758b"></path>
      </marker>
      <marker id="arrowException" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5.5 L 0 11 z" fill="#c64f4f"></path>
      </marker>
      <marker id="arrowSuccess" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5.5 L 0 11 z" fill="#32945b"></path>
      </marker>
      <marker id="arrowWarning" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5.5 L 0 11 z" fill="#c1861c"></path>
      </marker>
    </defs>
    ${workflowEdges.map((edge) => {
      const tone = edge.tone || "";
      const marker = tone === "exception" ? "arrowException" : tone === "success" ? "arrowSuccess" : tone === "warning" ? "arrowWarning" : "arrowDefault";
      const label = edge.label ? labelPoint(edge) : null;
      return `
        <path class="edge-path ${tone}" d="${pathFor(edge)}" marker-end="url(#${marker})"></path>
        ${label ? `<text class="edge-label" x="${label.x}" y="${label.y}" text-anchor="middle">${edge.label}</text>` : ""}
      `;
    }).join("")}
  `;
}

renderNodes();
renderEdges();
