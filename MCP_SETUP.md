# MCP Supabase Server Setup Guide

This guide will help you complete the setup of the Model Context Protocol (MCP) Supabase server for this project.

## What is MCP?

The Model Context Protocol (MCP) allows AI assistants like Claude Code to interact directly with your Supabase database. This enables powerful features like:

- Querying your database through natural language
- Analyzing database schemas
- Running SQL queries on your behalf
- Managing Supabase resources

## Prerequisites

1. A Supabase project (create one at https://supabase.com if you haven't)
2. Claude Code installed and configured

## Setup Steps

### Step 1: Get Your Supabase Project Reference ID

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings → General**
3. Find the **Reference ID** field
4. Copy this value

### Step 2: Generate a Personal Access Token

1. Visit https://supabase.com/dashboard/account/tokens
2. Click **Generate New Token**
3. Give it a descriptive name (e.g., "Claude Code MCP")
4. Set appropriate scopes (minimum: read access to your project)
5. Copy the generated token (you won't be able to see it again!)

### Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in the following values:
   ```env
   # Your Supabase project credentials
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

   # MCP Configuration
   SUPABASE_PROJECT_REF=your-project-ref-here
   SUPABASE_ACCESS_TOKEN=your-access-token-here
   ```

### Step 4: Verify MCP Configuration

The `.mcp.json` file has already been created in your project root with the following configuration:

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

This configuration uses environment variable expansion, so your sensitive tokens are kept secure in `.env.local`.

### Step 5: Test the Connection

In Claude Code, you can verify the MCP server is working by:

1. Running the `/mcp` command to check server status
2. Or using the `claude mcp list` command in your terminal
3. Try asking Claude Code to interact with your Supabase database

## Security Best Practices

⚠️ **Important Security Notes:**

- **Never commit `.env.local` to version control** (it's already in `.gitignore`)
- **Only use MCP with development/testing databases** - not production data
- **Use read-only access tokens** when possible to minimize risk
- **Rotate your access tokens regularly**
- **Never share your access tokens** in chat, issues, or documentation

## Troubleshooting

### Connection Issues

If you're having trouble connecting:

1. Verify your environment variables are set correctly in `.env.local`
2. Ensure your access token hasn't expired
3. Check that your project reference ID is correct
4. Confirm your access token has the necessary permissions

### Environment Variable Not Expanding

If environment variables aren't being expanded in `.mcp.json`:

1. Make sure `.env.local` exists and is in the project root
2. Restart Claude Code to reload environment variables
3. Verify the variable names match exactly (case-sensitive)

### MCP Server Not Showing Up

If the MCP server isn't appearing in Claude Code:

1. Check the `.mcp.json` syntax is valid JSON
2. Ensure the file is in the project root directory
3. Try running `claude mcp list` to see registered servers
4. Restart Claude Code

## Additional Resources

- [Supabase MCP Documentation](https://supabase.com/docs/guides/getting-started/mcp)
- [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Supabase and Claude Code documentation
3. Ensure all credentials are valid and have proper permissions

---

**Note**: This setup enables Claude Code to access your Supabase project through the official MCP server at `https://mcp.supabase.com/mcp`. The server uses dynamic client registration and OAuth for secure authentication.
