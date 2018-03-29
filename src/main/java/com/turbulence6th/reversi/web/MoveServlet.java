package com.turbulence6th.reversi.web;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.turbulence6th.reversi.ai.ReversiAI;

@WebServlet("/move")
public class MoveServlet extends HttpServlet {

	private static final long serialVersionUID = -2561666125097511381L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		int[][] board = Arrays.stream(request.getParameterValues("board[]"))
				.map(s -> Arrays.stream(s.split(",")).mapToInt(Integer::parseInt).toArray()).toArray(int[][]::new);

		ReversiAI ai = new ReversiAI(board);
		
		int[] move = ai.play();
		
		if(move != null) {
			JsonObject json = new JsonObject();
			json.addProperty("x", move[0]);
			json.addProperty("y", move[1]);
			response.getWriter().println(json);
		}
		
	}

}
