"""
EDA Report Generation Tools
Generates comprehensive HTML reports using ydata-profiling.
"""

import os
from pathlib import Path
from typing import Dict, Any, Optional
import polars as pl


def generate_ydata_profiling_report(
    file_path: str,
    output_path: str = "./outputs/reports/ydata_profile.html",
    minimal: bool = False,
    title: str = "Data Profiling Report"
) -> Dict[str, Any]:
    """
    Generate a comprehensive HTML report using ydata-profiling (formerly pandas-profiling).
    
    ydata-profiling provides extensive analysis including:
    - Overview: dataset statistics, warnings, reproduction
    - Variables: type inference, statistics, histograms, common values, missing values
    - Interactions: scatter plots, correlations (Pearson, Spearman, Kendall, Cramér's V)
    - Correlations: detailed correlation matrices and heatmaps
    - Missing values: matrix, heatmap, and dendrogram
    - Sample: first/last rows of the dataset
    - Duplicate rows: analysis and examples
    
    Args:
        file_path: Path to the dataset CSV file
        output_path: Where to save the HTML report
        minimal: If True, generates faster minimal report (useful for large datasets)
        title: Title for the report
        
    Returns:
        Dict with success status, report path, and statistics
    """
    try:
        from ydata_profiling import ProfileReport
        import pandas as pd
        
        # Read dataset (ydata-profiling requires pandas)
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.parquet'):
            df = pd.read_parquet(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_path}")
        
        # Auto-optimize for large datasets to prevent memory crashes
        rows, cols = df.shape
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
        
        # Automatic sampling for large datasets (>10MB or >50k rows)
        should_sample = file_size_mb > 10 or rows > 50000
        if should_sample and not minimal:
            print(f"📊 Large dataset detected: {rows:,} rows, {file_size_mb:.1f}MB")
            print(f"⚡ Sampling to 50,000 rows for memory efficiency...")
            df = df.sample(n=min(50000, rows), random_state=42)
            minimal = True  # Force minimal mode for large files
        
        # Force minimal mode for files >5MB even after sampling
        if file_size_mb > 5:
            minimal = True
            print(f"⚡ Using minimal profiling mode (file size: {file_size_mb:.1f}MB)")
        
        # Create output directory if needed
        os.makedirs(os.path.dirname(output_path) or "./outputs/reports", exist_ok=True)
        
        # Configure profile based on minimal flag
        if minimal:
            # Minimal mode: faster for large datasets, less memory
            profile = ProfileReport(
                df,
                title=title,
                minimal=True,
                explorative=False,
                samples=None,  # Disable sample display to save memory
                correlations=None,  # Skip correlations in minimal mode
                missing_diagrams=None,  # Skip missing diagrams
                duplicates=None,  # Skip duplicate analysis
                interactions=None  # Skip interactions
            )
        else:
            # Full mode: comprehensive analysis
            profile = ProfileReport(
                df,
                title=title,
                explorative=True,
                correlations={
                    "pearson": {"calculate": True},
                    "spearman": {"calculate": True},
                    "kendall": {"calculate": False},  # Slow for large datasets
                    "phi_k": {"calculate": True},
                    "cramers": {"calculate": True},
                }
            )
        
        # Generate HTML report
        profile.to_file(output_path)
        
        # Extract key statistics
        num_features = len(df.columns)
        num_rows = len(df)
        num_numeric = df.select_dtypes(include=['number']).shape[1]
        num_categorical = df.select_dtypes(include=['object', 'category']).shape[1]
        num_boolean = df.select_dtypes(include=['bool']).shape[1]
        missing_cells = df.isnull().sum().sum()
        total_cells = num_rows * num_features
        missing_pct = (missing_cells / total_cells) * 100 if total_cells > 0 else 0
        duplicate_rows = df.duplicated().sum()
        
        return {
            "success": True,
            "report_path": output_path,
            "message": f"✅ ydata-profiling report generated successfully at: {output_path}",
            "statistics": {
                "dataset_size": {
                    "rows": num_rows,
                    "columns": num_features,
                    "cells": total_cells
                },
                "variable_types": {
                    "numeric": num_numeric,
                    "categorical": num_categorical,
                    "boolean": num_boolean
                },
                "data_quality": {
                    "missing_cells": missing_cells,
                    "missing_percentage": round(missing_pct, 2),
                    "duplicate_rows": int(duplicate_rows)
                },
                "report_config": {
                    "minimal_mode": minimal,
                    "title": title
                }
            }
        }
        
    except ImportError:
        return {
            "success": False,
            "error": "ydata-profiling not installed. Install with: pip install ydata-profiling",
            "error_type": "MissingDependency"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to generate ydata-profiling report: {str(e)}",
            "error_type": type(e).__name__
        }
