"""
Production-grade tool result compression for small context window models.
Add this function to orchestrator.py before _parse_text_tool_calls method.
"""

def _compress_tool_result(self, tool_name: str, result: Dict[str, Any]) -> Dict[str, Any]:
    """
    Compress tool results for small context models (production-grade approach).
    
    Keep only:
    - Status (success/failure)
    - Key metrics (5-10 most important numbers)
    - File paths created  
    - Next action hints
    
    Full results stored in workflow_history and session memory.
    LLM doesn't need verbose output - only decision-making info.
    
    Args:
        tool_name: Name of the tool executed
        result: Full tool result dict
        
    Returns:
        Compressed result dict (typically 100-500 tokens vs 5K-10K)
    """
    if not result.get("success", True):
        # Keep full error info (critical for debugging)
        return result
    
    compressed = {
        "success": True,
        "tool": tool_name
    }
    
    # Tool-specific compression rules
    if tool_name == "profile_dataset":
        # Original: ~5K tokens with full stats
        # Compressed: ~200 tokens with key metrics
        r = result.get("result", {})
        compressed["summary"] = {
            "rows": r.get("num_rows"),
            "cols": r.get("num_columns"),
            "missing_pct": r.get("missing_percentage"),
            "numeric_cols": len(r.get("numeric_columns", [])),
            "categorical_cols": len(r.get("categorical_columns", [])),
            "file_size_mb": round(r.get("memory_usage_mb", 0), 1),
            "key_columns": list(r.get("columns", {}).keys())[:5]  # First 5 columns only
        }
        compressed["next_steps"] = ["clean_missing_values", "detect_data_quality_issues"]
        
    elif tool_name == "detect_data_quality_issues":
        r = result.get("result", {})
        compressed["summary"] = {
            "total_issues": r.get("total_issues", 0),
            "critical_issues": r.get("critical_issues", 0),
            "missing_data": r.get("has_missing"),
            "outliers": r.get("has_outliers"),
            "duplicates": r.get("has_duplicates")
        }
        compressed["next_steps"] = ["clean_missing_values", "handle_outliers"]
        
    elif tool_name in ["clean_missing_values", "handle_outliers", "encode_categorical"]:
        r = result.get("result", {})
        compressed["summary"] = {
            "output_file": r.get("output_file", r.get("output_path")),
            "rows_processed": r.get("rows_after", r.get("num_rows")),
            "changes_made": bool(r.get("changes", {}) or r.get("imputed_columns"))
        }
        compressed["next_steps"] = ["Use this file for next step"]
        
    elif tool_name == "train_baseline_models":
        r = result.get("result", {})
        models = r.get("models", [])
        if models:
            best = max(models, key=lambda m: m.get("test_score", 0))
            compressed["summary"] = {
                "best_model": best.get("model"),
                "test_score": round(best.get("test_score", 0), 4),
                "train_score": round(best.get("train_score", 0), 4),
                "task_type": r.get("task_type"),
                "models_trained": len(models)
            }
        compressed["next_steps"] = ["hyperparameter_tuning", "generate_combined_eda_report"]
        
    elif tool_name in ["generate_plotly_dashboard", "generate_ydata_profiling_report", "generate_combined_eda_report"]:
        r = result.get("result", {})
        compressed["summary"] = {
            "report_path": r.get("report_path", r.get("output_path")),
            "report_type": tool_name,
            "success": True
        }
        compressed["next_steps"] = ["Report ready for viewing"]
        
    elif tool_name == "hyperparameter_tuning":
        r = result.get("result", {})
        compressed["summary"] = {
            "best_params": r.get("best_params", {}),
            "best_score": round(r.get("best_score", 0), 4),
            "model_type": r.get("model_type"),
            "trials_completed": r.get("n_trials")
        }
        compressed["next_steps"] = ["perform_cross_validation", "generate_model_performance_plots"]
        
    else:
        # Generic compression: Keep only key fields
        r = result.get("result", {})
        if isinstance(r, dict):
            # Extract key fields (common patterns)
            key_fields = {}
            for key in ["output_path", "output_file", "status", "message", "success"]:
                if key in r:
                    key_fields[key] = r[key]
            compressed["summary"] = key_fields or {"result": "completed"}
        else:
            compressed["summary"] = {"result": str(r)[:200] if r else "completed"}
        compressed["next_steps"] = ["Continue workflow"]
    
    return compressed
